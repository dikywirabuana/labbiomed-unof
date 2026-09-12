export function Logo({
  variant = "lockup",
  className = "",
}: {
  variant?: "lockup" | "full";
  className?: string;
}) {
  const full = variant === "full";
  return (
    <img
      src="/logo-wordmark.png"
      alt="Laboratorium BIOMED"
      className={
        full
          ? `h-auto w-full max-w-sm object-contain ${className}`
          : `h-12 w-auto max-h-14 object-contain object-left sm:h-14 ${className}`
      }
    />
  );
}
