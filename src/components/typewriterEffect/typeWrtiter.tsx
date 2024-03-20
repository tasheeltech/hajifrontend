import { useEffect, useRef } from "react"
interface Props {
  text: string
}

const TextTypingEffect: React.FC<Props> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textTypingEffect = (
      element: HTMLDivElement,
      text: string,
      i = 0,
      speed = 20
    ) => {
      if (i === 0) {
        element.textContent = ""
      }
      element.textContent = text.substring(0, i + 1)

      if (i < text.length - 1) {
        setTimeout(
          () =>
            requestAnimationFrame(() =>
              textTypingEffect(element, text, i + 1, speed)
            ),
          1000 / speed
        )
      }
    }

    if (textRef.current) {
      textTypingEffect(textRef.current, text)
    }
  }, [text])

  return <div ref={textRef}>{/* Initial content if needed */}</div>
}

export default TextTypingEffect
