import { FunctionComponent } from "react";


const NoChart: FunctionComponent = () => {
  return (
    <div style={{
      padding: '80px 0px',
      textAlign: 'center',
      backgroundColor: 'white'
    }}>
      <div style={{
        fontSize: '50px',
        color: 'grey',
        marginBottom: '20px'
      }}>
        &#9888;
      </div>
      Chart unavailable for this location.
    </div>
  );
}

export default NoChart;