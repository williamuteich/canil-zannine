"use client"

export function DateDisplay() {
  return (
    <span className="text-sm text-blue-100">
      {new Date().toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </span>
  )
}