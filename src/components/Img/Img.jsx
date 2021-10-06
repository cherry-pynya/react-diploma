export default function Img({ url, alt, className, height }) {
  const placeholder = "https://via.placeholder.com/300";
  function addDefaultSrc(e) {
    e.target.src = placeholder;
  }

  return (
    <img
      src={url[0]}
      alt={alt}
      className={className}
      onError={addDefaultSrc}
    />
  );
}
