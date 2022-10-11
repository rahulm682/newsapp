import React from 'react'

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, source, author, date } = props;
  return (
    <>
      <div className="card">
        <img src={imageUrl != null ? imageUrl : ""} className="card-img-top" alt="Img not Found" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}
          </p>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "80%", zIndex: 1 }}>
            {source.name}
          </span>
          <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} at {new Date(date).toLocaleString()}</small></p>
          <a href={`${newsUrl}`} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    </>
  )
}

export default NewsItem
