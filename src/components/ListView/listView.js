import React from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh } from 'antd-mobile';
import ListItem from '../ListItem/listItem';
import STAR from '../../img/star.svg';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: false,
            height: document.documentElement.clientHeight,
        };
    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
        }), 0);
    }

    render() {
        return (<div>
            <PullToRefresh
                ref={el => this.ptr = el}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                indicator={this.state.down ? {} : {}}
                onRefresh={() => {
                    this.setState({ refreshing: true });
                    this.props.onLoadMore(() => {
                        this.setState({ refreshing: false });
                    });
                }}
            >
                <ul ref='listContent' style={{ padding: '0 20px' }}>
                    {this.props.data.map((item, index) => (
                        item
                            ? <ListItem key={item ? item.id : index} data={{ name: item.name, desc: item.description, owner: item.owner.login, language: item.language, stargazers_count: item.stargazers_count, starImg: STAR }}></ListItem>
                            : ''
                    ))}
                </ul>
            </PullToRefresh>
        </div>);
    }
}