export default function ResearchAuthors({ authors, highlightAuthor }: {
  authors?: string;
  highlightAuthor?: string;
}) {
  if (!authors) return null;
  const name = highlightAuthor || '';
  const index = name ? authors.indexOf(name) : -1;

  return (
    <p className="research-authors">
      Author List: {index < 0 ? authors : <>
        {authors.slice(0, index)}
        <strong><u>{name}</u></strong>
        {authors.slice(index + name.length)}
      </>}
    </p>
  );
}
