import React from 'react';
import './FormList.css';

class FormList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.addItem();
    }

    addItem(event) {
        if (event) event.preventDefault();
        this.setState(prevState => ({ items: [...prevState.items, ''] }))
    }

    removeItem(i, event) {
        event.preventDefault();
        let items = [...this.state.items];
        if (items.length <= 1) return; // leave at least 1 input
        items.splice(i, 1);
        this.setState({ items });

        this.props.handleChange(items);
    }

    handleChange(i, event) {
        let items = [...this.state.items];
        items[i] = event.target.value;
        this.setState({ items });

        this.props.handleChange(items);
    }

    render() {
        return (
            <div className="form-list-wrapper">
                <ul className="form-list">
                    {
                        this.state.items.map((el, i) =>
                            <li className="form-list-item" key={i}>
                                <input
                                    type={this.props.type}
                                    value={el || ''}
                                    onChange={this.handleChange.bind(this, i)}
                                />
                                {i > 0 &&
                                    <button className="remove" onClick={this.removeItem.bind(this, i)}>
                                        <span><i className="fas fa-minus-circle"></i> Remove</span>
                                    </button>
                                }
                            </li>
                        )
                    }
                </ul>

                <button className="add" onClick={this.addItem.bind(this)}>
                    <i className="fas fa-plus-circle"></i> Add Another
                </button>
            </div>
        );
    }
}

export default FormList;