
function PictureDay({ nasaInfo }) {

  return (
    <div>
      <h2>{nasaInfo.title} , {nasaInfo.date}</h2> 
      <img 
        src={nasaInfo.img} 
        alt={nasaInfo.title} 
      /> 
    </div>
  );
}

export default PictureDay;

