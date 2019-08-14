import React from "react";
import "./style.scss";

interface Props {
  id: string;
  name: string;
  onChange: any;
}

interface State {
  file?: File;
}

export default class ImageUpload extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) return;
    const selectedFile = event.currentTarget.files[0];
    this.setState({
      file: selectedFile
    });
    this.props.onChange(selectedFile);
  }

  render() {
    return (
      <div className="image-upload">
        <input
          type="file"
          onChange={this.handleChange}
          id={this.props.id}
          name={this.props.name}
          accept="image/*"
        />
        <div className="image-preview-zone">
          {this.state.file && (
            <img
              src={URL.createObjectURL(this.state.file)}
              className="image-preview"
              alt="Preview"
            />
          )}
        </div>
      </div>
    );
  }
}
