export function formatMarkdown(html: string): string {
  return html
    .replace(/<h1>/g, "\n# ")
    .replace(/<\/h1>/g, "\n\n")
    .replace(/<h2>/g, "\n## ")
    .replace(/<\/h2>/g, "\n\n")
    .replace(/<h3>/g, "\n### ")
    .replace(/<\/h3>/g, "\n\n")
    .replace(/<p>/g, "\n")
    .replace(/<\/p>/g, "\n\n")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<strong>/g, "**")
    .replace(/<\/strong>/g, "**")
    .replace(/<em>/g, "*")
    .replace(/<\/em>/g, "*")
    .replace(/<u>/g, "__")
    .replace(/<\/u>/g, "__")
    .replace(/<s>/g, "~~")
    .replace(/<\/s>/g, "~~")
    .replace(/<code>/g, "`")
    .replace(/<\/code>/g, "`")
    .replace(/<pre><code>/g, "\n```\n")
    .replace(/<\/code><\/pre>/g, "\n```\n")
    .replace(/<ul>/g, "\n")
    .replace(/<\/ul>/g, "\n")
    .replace(/<ol>/g, "\n")
    .replace(/<\/ol>/g, "\n")
    .replace(/<li>/g, "- ")
    .replace(/<\/li>/g, "\n")
    .replace(/<blockquote>/g, "\n> ")
    .replace(/<\/blockquote>/g, "\n\n")
    .replace(/<a href="(.*?)">/g, "[$1](")
    .replace(/<\/a>/g, ")")
    .replace(/<img src="(.*?)".*?>/g, "![]($1)")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

