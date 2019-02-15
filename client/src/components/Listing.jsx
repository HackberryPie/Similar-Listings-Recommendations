import React from "react";

const Listing = ({ listing }) => {
  return (
    <div className="card rounded-0">
      <div className="card-img-top card-img-top-250 center-cropped">
        <img
          className="card-img-top img-fluid rounded-0"
          src={`${listing.imageUrl}.jpg`}
        />
      </div>
      <div className="card-info">
        <div className="card-save">
          <img src="https://cdn-assets-s3.streeteasy.com/assets/svg/icons/save_star_outlined-28528902b24fb7df8745fc07de39842f3019dfea8719052f407f555a9891a44b.svg" />
        </div>
        <div className="card-title">SALE IN {listing.city}</div>
        <div className="card-address">{listing.address}</div>
        <div className="card-priceSpacer">
          <div className="card-price">
            $
            {Number(Math.round(listing.price / 1000) * 1000).toLocaleString(
              "en"
            )}
          </div>
        </div>
        <div className="card-property">
          <div className="card-propertyItem">
            <span className="card-property-bed">
              <img src="https://cdn-assets-s3.streeteasy.com/assets/svg/listing/beds-600addd00c844965084092d23a4abcb35238b01651a4468b0539890287235d35.svg" />
            </span>
            {listing.bedNum} Beds
          </div>
          <div className="card-propertySeparator" />
          <div className="card-propertyItem">
            <span className="card-property-bath">
              <img src="https://cdn-assets-s3.streeteasy.com/assets/svg/listing/bath-cb8fbdc33e78e5a2875460981123163011642f32613c1a24a6c123a5af07a1df.svg" />
            </span>
            {listing.bathNum} Baths
          </div>
          <div className="card-propertySeparator" />
          <div className="card-propertyItem">
            <span className="card-property-footage">
              <img src="https://cdn-assets-s3.streeteasy.com/assets/svg/listing/squarefoot-9ad2d4f3bf0fefb1b1777763f317af532d15ef92825a002233322f6c53344062.svg" />
            </span>
            {Number(listing.sqFootage).toLocaleString("en")} ft<sup>2</sup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
