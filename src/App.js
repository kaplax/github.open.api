import React, { Component } from 'react';
import reactDOM from 'react-dom';
import { SearchBar, WhiteSpace } from 'antd-mobile';
import ListView from './components/ListView/listView';


const OPEN_API = 'https://api.github.com/search/repositories';
const per_page = 10;
let page = 1;

class App extends Component {
  constructor() {
    super();
    this.state = {
      listItem: [],//默认的列表空数据
      keyword: '',//搜索关键字
    }
  }
  //搜索
  search(keyword, page = 1, per_page = 10) {
    if (!keyword) return;
    let that = this;
    this.setState({
      keyword
    });
    const url = `${OPEN_API}?q=${keyword}&sort=stars&order=desc&page=${page}&per_page=${per_page}`
    fetch(url).then(response => {
      return response.json();
    }).then(json => {
      that.setState({
        listItem: json.items
      })
    })
    if (this.refs.listview) { //第二次搜索回滚至顶部
      reactDOM.findDOMNode(this.refs.listview.ptr).scrollTop = 0;
    }
  }
  //加载更多
  loadMore(cb) { //接收callback 执行加载完成数据后的异步回调
    const url = `${OPEN_API}?q=${this.state.keyword}&sort=stars&order=desc&page=${++page}&per_page=${per_page}`
    fetch(url).then(response => {
      return response.json();
    }).then(json => {
      this.setState({
        listItem: this.state.listItem.concat(json.items)
      })
      if (cb) cb();
    })
  }


  render() {
    return (
      <div className="App">
        <SearchBar placeholder="Search repo" maxLength={10} onSubmit={this.search.bind(this)} />
        <WhiteSpace />
        <div>
          {this.state.listItem.length
            ? <ListView ref='listview' data={this.state.listItem} onLoadMore={this.loadMore.bind(this)} />
            :
            (<div style={{ textAlign: 'center', marginTop: '50px', display: this.state.listItem.length ? 'none' : 'block' }}>
              <p>Search more than 82M repositories</p>
              <p><strong>ProTip!</strong>For an advanced search , use some of our </p>
              <svg style={{ position: 'absolute', top: '50%', left: '50%', marginTop: '-50px', marginLeft: '-50px' }} height="100" viewBox="0 0 16 16" version="1.1" width="100" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
            </div>)}
        </div>
      </div>
    );
  }
}

export default App;
