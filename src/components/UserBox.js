import { Dropdown, NavDropdown } from 'react-bootstrap'
import '../styles/UserBox.css';

const UserBox = () => {
    return (
        <div class="user_box_container">
            
            <div>
                <h1>John Doe</h1>
                <p class="sub_info">Master Admin</p>
                <p class="sub_info">Email</p>
            </div>
        </div>
    )   
}

export default UserBox;