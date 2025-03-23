export interface MessagePart {
    type: "text" | "code"
    content: string
    language?: string
    isHtml?: boolean // Indicate if content contains HTML
  }
  
  export const parseMessageContent = (content: string): MessagePart[] => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts: MessagePart[] = []
    let lastIndex = 0
    let match
  
    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        const textContent = content.slice(lastIndex, match.index)
        const formattedText = applyStarFormatting(textContent) // Apply formatting
  
        parts.push({
          type: "text",
          content: formattedText,
          isHtml: true, // ✅ Mark as HTML content
        })
      }
  
      parts.push({
        type: "code",
        language: match[1] || "plaintext",
        content: match[2].trim(),
      })
  
      lastIndex = match.index + match[0].length
    }
  
    if (lastIndex < content.length) {
      const remainingText = content.slice(lastIndex)
      const formattedText = applyStarFormatting(remainingText)
  
      parts.push({
        type: "text",
        content: formattedText,
        isHtml: true, // ✅ Mark as HTML content
      })
    }
  
    return parts.length > 0 ? parts : [{ type: "text", content }]
  }
  
  // ✅ Fixed applyStarFormatting function
  const applyStarFormatting = (text: string): string => {
    let formattedText = text
  
    // Convert ***bold text*** to <strong class="font-bold">text</strong>
    formattedText = formattedText.replace(/\*\*\*(.*?)\*\*\*/g, `<strong class="font-bold">$1</strong>`)
  
    // Convert **semibold text** to <strong class="font-semibold">text</strong>
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold">$1</strong>`)
  
    return formattedText
  }
  