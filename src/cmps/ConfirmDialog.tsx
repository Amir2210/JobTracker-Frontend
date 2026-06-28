import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type ConfirmDialogProps = {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onClose: () => void
}

export function ConfirmDialog({
  isOpen,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-label={title}
        className={`relative bg-base-100 rounded-lg shadow-2xl w-full max-w-sm p-6 transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <h2 className='text-xl font-medium'>{title}</h2>
        <p className='mt-2 text-slate-500'>{message}</p>
        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={onClose}
            className='btn capitalize bg-base-200 hover:bg-base-300 border-none'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className='btn capitalize bg-red-500 text-white hover:bg-red-600 border-none'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
