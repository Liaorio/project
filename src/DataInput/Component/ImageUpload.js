import React from 'react';


export default class ImageUpload extends React.Component {
    handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            console.log(this);
            this.props.handleUpload(reader.result)
        }
        reader.readAsDataURL(file)
    }

    render() {
        let { pictureUrl } = this.props;
        let imagePreview = null;
        if (pictureUrl) {
            imagePreview = (<img width={50} src={pictureUrl} alt="" />);
        } else {
            imagePreview = (<span></span>);
        }
        return (
            <div className="preview-component" style={{ display: 'flex' }}>
                <form>
                    <input className="file-input" type="file" onChange={e => this.handleImageChange(e)}/> 
                </form> 
                <div className="imgPreview">{imagePreview}</div> 
            </div>
        )
    }
}