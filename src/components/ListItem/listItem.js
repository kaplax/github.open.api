import React, { Component } from 'react';
import './listItem.css';


export default class ListItem extends Component {
    render() {
        return (
            <li className="list_item">
                <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0'}}>
                    <span className="name">{this.props.data.name}</span>
                    <span className="owner">{this.props.data.owner}</span>
                </div>
                <div>
                    <span className="desc">{this.props.data.desc}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ backgroundColor: '#f1f8ff', color: '#0366d6', padding: '3px', boxSizing: 'border-box' }}>{this.props.data.language}</p>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <img src={this.props.data.starImg ? this.props.data.starImg : null} alt="star" />
                        <p style={{marginLeft:'5px'}}>{this.props.data.stargazers_count}</p>
                    </div>
                </div>

            </li>
        )
    }
}