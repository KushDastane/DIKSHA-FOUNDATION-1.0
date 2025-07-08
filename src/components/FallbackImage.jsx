// components/FallbackImage.jsx
const FallbackImage = ({
  src,
  alt = "",
  className = "",
  lazy = true,
}) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");

  //   The <picture> element tells the browser:

//   ("Try the <source> first");

//   ("If that’s not supported, use the <img> tag fallback");

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={lazy ? "lazy" : "eager"}
      />
    </picture>
  );
};

export default FallbackImage;
