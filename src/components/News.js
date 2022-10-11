import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [],
      isLoading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsMonkey ${this.capitalize(this.props.category)}`;
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  async updateNews(pageNumber) {
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${pageNumber}&pageSize=${this.props.pageSize}`
    this.setState({ isLoading: true })
    let dataObj = await fetch(url)
    let data = await dataObj.json()

    this.setState({ articles: data.articles, totalResults: data.totalResults, isLoading: false, page: pageNumber })
  }

  async componentDidMount() {
    // const url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0487dda1c6b747da9ebb4c7e44ca2e93&page=1&pageSize=${this.props.pageSize}`
    // this.setState({ isLoading: true })
    // const dataObj = await fetch(url)
    // const data = await dataObj.json()
    // this.setState({ articles: data.articles, totalResults: data.totalResults, isLoading: false })
 
    this.updateNews(1);
  }

  handleNextClick = async () => {
    if (!(this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize))) {
      // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0487dda1c6b747da9ebb4c7e44ca2e93&page=${this.state.page + 1
      //   }&pageSize=${this.props.pageSize}`
      // this.setState({ isLoading: true })
      // const dataObj = await fetch(url)
      // const data = await dataObj.json()

      // this.setState({
      //   articles: data.articles,
      //   page: this.state.page + 1,
      //   isLoading: false
      // })

      // this.setState({
      //   page: this.state.page + 1,
      // })
      this.updateNews(this.state.page + 1);
    }
  }

  handlePrevClick = async () => {
    //   }&pageSize=${this.props.pageSize}`
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0487dda1c6b747da9ebb4c7e44ca2e93&page=${this.state.page - 1
    // this.setState({ isLoading: true })
    // const dataObj = await fetch(url)
    // const data = await dataObj.json()

    // this.setState({
    //   articles: data.articles,
    //   page: this.state.page - 1,
    //   isLoading: false
    // })


    // this.setState({
    //   page: this.state.page - 1
    // })
    this.updateNews(this.state.page - 1);
  }

  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1 })
    this.state.page+=1;
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let dataObj = await fetch(url)
    let data = await dataObj.json()

    this.setState({
      articles: this.state.articles.concat(data.articles),
      isLoading: false,
      totalResults: data.totalResults,
      page: this.state.page
    })
  }


  /* col-md-4 bootstrap divides screen into 12 grids horizontally and col-md-4 means usage of 4 such grids */
  render() {
    return (
      <div className="my-3">
        <h1 className="text-center" style={{margin:"80px 0px 20px"}}>{`News-Monkey Top Headlines ${this.capitalize(this.props.category)}`}</h1>
        {this.state.isLoading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((article) => {
                return (
                  <div className="col-md-4 my-3" key={article.url}>
                    <NewsItem
                      title={article.title?article.title:''}
                      description={article.description?article.description:''}
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                      date={article.publishedAt}
                      author={article.author}
                      source={article.source}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }
}

//    render() {
//     return (
//       <div className="container my-3">
//         <h1 className="text-center">{`News-Monkey Top Headlines ${this.capitalize(this.props.category) }`}</h1>
//         {this.state.isLoading && <Spinner />}
//         <div className="row">
//           {!this.state.isLoading && this.state.articles.map((article) => {
//             return (
//               <div className="col-md-4 my-3" key={article.url}>
//                 <NewsItem
//                   title={article.title}
//                   description={article.description}
//                   imageUrl={article.urlToImage}
//                   newsUrl={article.url}
//                   date={article.publishedAt}
//                   author={article.author}
//                   source={article.source}
//                 />
//               </div>
//             )
//           })}
//         </div>
//         <div className="d-flex justify-content-between">
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={this.handlePrevClick}
//             disabled={this.state.page <= 1 ? true : false}
//           >
//             &larr; Prev
//           </button>
//           <button
//             type="button"
//             className="btn btn-primary"
//             onClick={this.handleNextClick}
//             disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     )
//   }
// }

// export default withRouter(News);
export default News;


News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  country: PropTypes.string
};

News.defaultProps = {
  pageSize: 9,
  category: "general",
  country: "in"
};