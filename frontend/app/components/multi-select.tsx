"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  // Create a memoized version of selected to prevent unnecessary re-renders
  const safeSelected = React.useMemo(() => {
    return Array.isArray(selected) ? selected : []
  }, [selected])

  const handleUnselect = React.useCallback(
    (option: string) => {
      onChange(safeSelected.filter((s) => s !== option))
    },
    [safeSelected, onChange],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && safeSelected.length > 0) {
            onChange(safeSelected.slice(0, -1))
          }
        }
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [safeSelected, onChange],
  )

  // Memoize selectables to prevent unnecessary calculations
  const selectables = React.useMemo(() => {
    return options.filter((option) => !safeSelected.includes(option.value))
  }, [options, safeSelected])

  // Memoize filtered options based on input value
  const filteredOptions = React.useMemo(() => {
    return selectables.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }, [selectables, inputValue])

  return (
    <div className={`relative ${className}`} onKeyDown={handleKeyDown}>
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onClick={() => {
          inputRef.current?.focus()
        }}
      >
        <div className="flex flex-wrap gap-1">
          {safeSelected.map((option) => {
            const selectedOption = options.find((o) => o.value === option)
            return (
              <Badge key={option} variant="secondary" className="rounded-sm">
                {selectedOption?.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                  type="button"
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => {
              setTimeout(() => setOpen(false), 200)
            }}
            onFocus={() => setOpen(true)}
            placeholder={safeSelected.length === 0 ? placeholder : undefined}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      {open && filteredOptions.length > 0 ? (
        <div className="absolute w-full z-10 top-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <div className="h-full overflow-auto max-h-[200px] p-1">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => {
                  onChange([...safeSelected, option.value])
                  setInputValue("")
                }}
                className="cursor-pointer rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
