import { FunctionComponent } from "react";

const PageFooter: FunctionComponent = () => {
    return ( 
        <div style={{ 
            color: 'gray', 
            backgroundColor: '#101010',
            textAlign: 'center', 
            padding: '20px'}}>
            &copy; copyright 2020-2022
        </div>
     );
}
 
export default PageFooter;