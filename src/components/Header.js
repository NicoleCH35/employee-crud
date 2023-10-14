import { Row, Space } from 'antd';
import AddEmployee from './Employee/Add';

const Header = () => {
    return (
        <Row justify="space-between" align="middle">
            <h2>Employee CRUD</h2>
            {/* <div> */}
                <AddEmployee />
            {/* </div> */}
        </Row>
    );
};

export default Header;