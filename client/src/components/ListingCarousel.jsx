import React from "react";
import Listing from "./Listing.jsx";
import Axios from "axios";

class ListingCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listings: [] };
    this.getSimilarListings = this.getSimilarListings.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    var id = this.props.match.params.id;
    this.getSimilarListings(id);
  }

  getSimilarListings(id) {
    Axios.get(`/api/similarlistings/${id}`).then(({ data }) => {
      this.setState({ listings: data });
    });
  }

  handlePrevClick() {
    event.preventDefault();
    $(".carousel").carousel("prev");
  }

  handleNextClick() {
    event.preventDefault();

    $(".carousel").carousel("next");
  }

  render() {
    const { listings } = this.state;
    return (
      <div className="contentBlock">
        <section className="container p-t-3">
          <div className="row">
            <div className="heading">
              <h1 className="title">Similar Sales</h1>
            </div>
          </div>
        </section>
        <section
          className="carousel slide"
          id="carousel"
          data-ride="carousel"
          id="postsCarousel"
          data-interval="false"
          data-wrap="false"
        >
          <a
            href="#carousel"
            className="previous round"
            data-slide="prev"
            onClick={this.handlePrevClick}
          >
            &lsaquo;
          </a>
          <a
            href="#carousel"
            className="next round"
            data-slide="next"
            onClick={this.handleNextClick}
          >
            &rsaquo;
          </a>
          <div className="container carousel-inner">
            <div className="row row-equal carousel-item active m-t-0">
              {listings.slice(0, 3).map(listing => (
                <div className="cardSlide" key={listing._id}>
                  <Listing listing={listing} />
                </div>
              ))}
            </div>
            <div className="row row-equal carousel-item m-t-0">
              {listings.slice(3, 6).map(listing => (
                <div className="cardSlide" key={listing._id}>
                  <Listing listing={listing} />
                </div>
              ))}
            </div>
            <div className="row row-equal carousel-item m-t-0">
              {listings.slice(6, 9).map(listing => (
                <div className="cardSlide" key={listing._id}>
                  <Listing listing={listing} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ListingCarousel;
