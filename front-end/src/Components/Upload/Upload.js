import React from 'react';
import './Upload.css';

class Upload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        });
    }

    render() {
        return (
            <div className="upload">
                <input type="file" onChange={this.handleChange} id={this.props.id} name={this.props.name} />
                <div className="image-preview-zone">
                    <img src={this.state.file} className="image-preview" alt="Preview" />
                </div>
            </div>
        );
    }
}
export default Upload;