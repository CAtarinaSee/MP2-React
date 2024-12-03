function PictureDay({ nasaInfo }) {
  return (
    <div>
      <h2>{nasaInfo.title}</h2>
      <img
        src={nasaInfo.img}
        alt={nasaInfo.title}
      />
      <p style={{ marginTop: "50px"}}>{nasaInfo.description}</p>
    </div>
  );
}

export default PictureDay;

