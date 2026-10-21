export default function ResearchAuthors({ authors, highlightAuthor, authorNote }: {
  authors?: string;
  highlightAuthor?: string;
  authorNote?: string;
}) {
  if (!authors) return null;
  const name = highlightAuthor || '';
  const index = name ? authors.indexOf(name) : -1;

  return (
    <p className="research-authors">
      {index < 0 ? authors : <>
        {authors.slice(0, index)}
        <strong><u>{name}</u></strong>
        {authors.slice(index + name.length)}
      </>}
      {authorNote && <> <span className="research-author-note">{authorNote}</span></>}
    </p>
  );
}
