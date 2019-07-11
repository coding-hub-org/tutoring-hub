import React from 'react';
import './style.scss';

interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    value?: string[];

    handleChange?: any;
    type?: string;
}

interface State {
    items: any[];
}

export default class FormList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            items: []
        };
    }

    componentDidMount() {
    }

    addItem(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (event) event.preventDefault();
        this.setState(prevState => ({ items: [...prevState.items, ''] }))
    }

    removeItem(item: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        let items = [...this.state.items];
        if (items.length <= 1) return; // leave at least 1 input
        items.splice(item, 1);
        this.setState({ items });

        this.props.handleChange(items);
    }

    handleChange(item: any, event: React.ChangeEvent<HTMLInputElement>) {
        let items = [...this.state.items];
        items[item] = event.currentTarget.value;
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