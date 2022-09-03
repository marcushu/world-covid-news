import { FunctionComponent } from "react";


const NowNews: FunctionComponent = () => {
  return (
    <div style={{
      padding: '80px 0px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: '50px', 
        color: 'grey',
        marginBottom: '20px'}}>
        &#9888;
      </div>
      <div style={{color: 'white'}}>
        News stories are unavailable for this location.
      </div>

    </div>
  );
}

export default NowNews;