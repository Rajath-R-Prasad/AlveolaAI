export default function ConfirmModal({ preview, onConfirm, onRetake }) {
  return (
    <div className="fixed inset-0 z-[300] bg-bg/94 backdrop-blur-2xl
                    flex items-center justify-center p-4 animate-fadeIn">
      <div className="card w-full max-w-[520px] p-5 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2">Confirm your X-ray</h3>
        <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6">
          Verify this is the correct patient radiograph before running analysis.
        </p>

        {/* Preview */}
        <div className="bg-black rounded-xl overflow-hidden mb-5 sm:mb-6 h-48 sm:h-64
                        flex items-center justify-center border border-border">
          <img src={preview} alt="X-ray preview"
            className="max-w-full max-h-full object-contain" />
        </div>

        {/* Checklist */}
        <div className="mb-5 sm:mb-6">
          {[
            "Shows a chest X-ray in PA or AP view",
            "Is not blurry or over/under-exposed",
            "Belongs to the correct patient",
          ].map((item, i) => (
            <div key={i} className="flex gap-2.5 sm:gap-3 py-2 border-b border-border text-xs sm:text-sm text-muted">
              <span className="text-sage font-bold">✓</span>
              {item}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <button onClick={onConfirm}
            className="btn-coral flex-1 justify-center py-3 sm:py-3.5 text-xs sm:text-sm rounded-xl">
            Confirm &amp; Analyse
          </button>
          <button onClick={onRetake} className="btn-ghost justify-center py-3 text-xs sm:text-sm">
            Re-upload
          </button>
        </div>
      </div>
    </div>
  );
}

