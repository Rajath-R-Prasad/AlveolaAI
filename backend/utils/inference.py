"""
AlveolaAI Inference Module (ONNX Runtime Engine)
Ultra-lightweight, CPU-optimized inference without PyTorch/Torchvision dependencies.
"""
import os
import numpy as np
from PIL import Image
from pathlib import Path
import onnxruntime as ort

MODEL_LOADED = False
session = None
IMG_SIZE = 256
IMG_MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 3, 1, 1)
IMG_STD  = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 3, 1, 1)


def load_model(model_path="models/best_model.onnx"):
    global session, MODEL_LOADED, IMG_SIZE

    # Fallback to .onnx if .pt was provided in env
    if model_path.endswith(".pt"):
        onnx_candidate = model_path.replace(".pt", ".onnx")
        if os.path.exists(onnx_candidate):
            model_path = onnx_candidate

    ckpt_path = Path(model_path)
    if not ckpt_path.exists():
        raise FileNotFoundError(f"ONNX Model not found: {ckpt_path.resolve()}")

    opts = ort.SessionOptions()
    opts.intra_op_num_threads = 1
    opts.inter_op_num_threads = 1
    opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL

    session = ort.InferenceSession(
        str(ckpt_path),
        sess_options=opts,
        providers=["CPUExecutionProvider"]
    )

    MODEL_LOADED = True
    print(f"[INFO] ONNX model ready - path={ckpt_path} provider=CPUExecutionProvider")


def _preprocess(pil_image: Image.Image) -> np.ndarray:
    """Resize, convert to float32 [0, 1], normalize with ImageNet mean/std."""
    img = pil_image.convert("RGB").resize((IMG_SIZE, IMG_SIZE))
    arr = np.array(img, dtype=np.float32) / 255.0  # (H, W, C)
    arr = np.transpose(arr, (2, 0, 1))             # (C, H, W)
    arr = np.expand_dims(arr, axis=0)              # (1, C, H, W)
    arr = (arr - IMG_MEAN) / IMG_STD
    return arr.astype(np.float32)


def _softmax(x: np.ndarray) -> np.ndarray:
    """Compute softmax over class logits."""
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=-1, keepdims=True)


def run_inference(pil_image: Image.Image, threshold: float = 0.5):
    if not MODEL_LOADED or session is None:
        raise RuntimeError("Model not loaded. Call load_model() first.")

    x = _preprocess(pil_image)

    # Run ONNX inference
    outputs = session.run(["seg_mask", "cls_logits"], {"input": x})
    seg_mask = outputs[0][0, 0]     # (256, 256) float in [0, 1]
    cls_logits = outputs[1][0]     # (2,) logits

    probs = _softmax(cls_logits)
    predicted_idx = int(np.argmax(probs))

    binary_mask = (seg_mask > threshold).astype(np.float32)
    opacity_pct = float(np.mean(binary_mask) * 100)

    if predicted_idx == 0:
        severity = "Normal"
    elif opacity_pct <= 15:
        severity = "Mild"
    elif opacity_pct <= 40:
        severity = "Moderate"
    else:
        severity = "Severe"

    return {
        "class_scores": {
            "Normal":    round(float(probs[0]) * 100, 2),
            "Pneumonia": round(float(probs[1]) * 100, 2),
        },
        "predicted_class": ["Normal", "Pneumonia"][predicted_idx],
        "confidence":      round(float(probs[predicted_idx]) * 100, 2),
        "severity":        severity,
        "opacity_pct":     round(opacity_pct, 2),
        "seg_mask":        seg_mask,
        "binary_mask":     binary_mask,
    }


def compute_severity(opacity_pct: float, predicted_class: str) -> str:
    if predicted_class == "Normal":
        return "Normal"
    if opacity_pct <= 15:
        return "Mild"
    if opacity_pct <= 40:
        return "Moderate"
    return "Severe"


def is_model_loaded() -> bool:
    return MODEL_LOADED