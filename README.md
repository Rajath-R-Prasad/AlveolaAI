# AlveolaAI
### AI-Powered Pneumonia Detection from Chest Radiographs

AlveolaAI is a full-stack AI platform that assists clinicians by automatically detecting pneumonia from chest X-ray images. The system identifies lung opacities, localizes affected regions, and provides severity grading using deep learning.

The platform integrates computer vision, explainable AI, and a web interface to accelerate radiograph analysis and support medical decision-making.

---

# Overview

Pneumonia remains one of the leading causes of respiratory illness and mortality worldwide. Diagnosing pneumonia from chest radiographs can be difficult due to subtle opacity patterns and the high workload faced by radiologists.

AlveolaAI addresses this challenge by providing an AI-assisted diagnostic system that:

• Detects pneumonia opacities in chest X-rays  
• Localizes infected lung regions using bounding boxes  
• Estimates pneumonia severity  
• Provides explainable visualizations for transparency  
• Generates clinician-friendly analysis output  

The system is designed to assist healthcare professionals by providing fast and interpretable AI support during radiograph review.

---

# Key Features

### Automated Pneumonia Detection
Uses YOLOv8 deep learning models to detect lung opacities associated with pneumonia.

### Bounding Box Localization
Highlights suspected pneumonia regions directly on chest X-ray images.

### Severity Scoring
Estimates pneumonia severity based on the percentage of lung opacity detected.

### Explainable AI
Grad-CAM heatmaps help visualize which areas of the image influenced the model’s decision.

### Doctor Mode
Displays advanced analysis metrics including detection confidence scores and bounding box data.

### Web-Based Platform
Accessible through a browser, allowing deployment across hospitals, telemedicine platforms, and remote healthcare systems.

---

# System Architecture

User Upload  
↓  
React Frontend  
↓  
Axios POST Request  
↓  
FastAPI Backend  
↓  
Image Preprocessing  
↓  
YOLOv8 Detection Model (PyTorch)  
↓  
Postprocessing  
↓  
Annotated Image + Severity Score  
↓  
JSON Response  
↓  
Frontend Result Display

---

# Tech Stack

## Frontend
React  
Tailwind CSS  
Axios  
React Query  

## Backend
FastAPI  
Python  
Uvicorn  
Pydantic  

## AI / Computer Vision
PyTorch  
YOLOv8 (Ultralytics)  
OpenCV  
NumPy  
Grad-CAM  

## Deployment
Vercel (Frontend Hosting)  
Render (Backend Hosting)

---

# Dataset

The model is trained using publicly available chest X-ray datasets.

### RSNA Pneumonia Detection Challenge
https://www.kaggle.com/c/rsna-pneumonia-detection-challenge

### NIH ChestX-ray14 Dataset
https://nihcc.app.box.com/v/ChestXray-NIHCC

These datasets provide annotated chest X-ray images used to train and evaluate pneumonia detection models.

---


# Usage

1. Upload a chest X-ray image through the web interface.
2. The system sends the image to the backend for analysis.
3. The deep learning model detects lung opacities and estimates severity.
4. Results are displayed with annotated regions and confidence scores.

---

# Research Background

This project builds on advances in medical imaging and deep learning for pneumonia detection.

Deep Learning for Chest X-ray Analysis  
https://www.sciencedirect.com/science/article/pii/S1361841521001717

Pneumonia Detection Using Ensemble CNN Models  
https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0256630

Attention-Guided Pneumonia Detection  
https://www.nature.com/articles/s41598-025-23664-x

---

