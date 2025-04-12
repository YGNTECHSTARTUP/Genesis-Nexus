import { cn } from "@/lib/utils"

interface TrustScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function TrustScoreBadge({ score, size = "md" }: TrustScoreBadgeProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 90) return "bg-emerald-500"
    if (score >= 80) return "bg-green-500"
    if (score >= 70) return "bg-lime-500"
    if (score >= 60) return "bg-yellow-500"
    if (score >= 50) return "bg-amber-500"
    return "bg-red-500"
  }

  // Determine size
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold",
        getColor(),
        sizeClasses[size],
      )}
      title={`Trust Score: ${score}/100`}
    >
      {score}
    </div>
  )
}
