const galleryMachine = {
  start: {
    SEARCH: 'loading' },

  loading: {
    SEARCH_SUCCESS: 'gallery',
    SEARCH_FAILURE: 'error',
    CANCEL_SEARCH: 'gallery' },

  error: {
    SEARCH: 'loading' },

  gallery: {
    SEARCH: 'loading',
    SELECT_PHOTO: 'photo' },

  photo: {
    EXIT_PHOTO: 'gallery' } };



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gallery: 'start', // finite state
      query: '',
      items: [] };

  }

  componentDidMount() {
    const { node } = this;

    if (!node) return;

    this.flipping = new Flipping({
      parentElement: node });


    // initialize flipping with the initial bounds
    this.flipping.read();
  }

  componentWillUpdate() {
    this.flipping.read();
  }

  componentDidUpdate() {
    this.flipping.flip();
  }

  command(nextState, action) {
    switch (nextState) {
      case 'loading':
        // execute the search command
        this.search(action.query);
        break;
      case 'gallery':
        if (action.items) {
          // update the state with the found items
          return { items: action.items };
        }
        break;
      case 'photo':
        if (action.item) {
          // update the state with the selected photo item
          return { photo: action.item };
        }
        break;
      default:
        break;}

  }

  transition(action) {
    const currentGalleryState = this.state.gallery;
    const nextGalleryState =
    galleryMachine[currentGalleryState][action.type];

    if (nextGalleryState) {
      const nextState = this.command(nextGalleryState, action);

      this.setState({
        gallery: nextGalleryState,
        ...nextState });

    }
  }

  handleSubmit(e) {
    e.persist();
    e.preventDefault();

    this.transition({ type: 'SEARCH', query: this.state.query });
  }

  search(query) {
    const encodedQuery = encodeURIComponent(query);

    setTimeout(() => {
      fetchJsonp(
      `https://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&tags=${encodedQuery}`,
      { jsonpCallback: 'jsoncallback' }).
      then(res => res.json()).
      then(data => {
        this.transition({ type: 'SEARCH_SUCCESS', items: data.items });
      });
    }, 1000);
  }
  handleChangeQuery(value) {
    this.setState({ query: value });
  }
  renderForm(state) {
    return /*#__PURE__*/(
      React.createElement("form", {
        className: "ui-form",
        onSubmit: e => this.handleSubmit(e),
        "data-flip-key": "form" }, /*#__PURE__*/
      React.createElement("input", {
        type: "search",
        className: "ui-input",
        value: this.state.query,
        onChange: e => this.handleChangeQuery(e.target.value),
        placeholder: "Search Flickr for photos...",
        disabled: state === 'loading' }), /*#__PURE__*/

      React.createElement("div", { className: "ui-buttons" }, /*#__PURE__*/
      React.createElement("button", {
        className: "ui-button",
        disabled: state === 'loading',
        "data-flip-key": "search",
        "data-flip-parent": "form" },
      state === 'loading' ? 'Searching...' : 'Search'),

      state === 'loading' && /*#__PURE__*/
      React.createElement("button", {
        className: "ui-button",
        type: "button",
        onClick: () => this.transition({
          type: 'CANCEL_SEARCH' }) }, "Cancel"))));







  }
  renderGallery(state) {
    return /*#__PURE__*/(
      React.createElement("section", { className: "ui-items", "data-state": state },
      this.state.items.map((item, i) => /*#__PURE__*/
      React.createElement("img", {
        src: item.media.m,
        className: "ui-item",
        style: { '--i': i },
        key: item.link,
        onClick: () => this.transition({
          type: 'SELECT_PHOTO', item }),

        "data-flip-key": item.link }))));




  }
  renderPhoto(state) {
    if (state !== 'photo') return;

    return /*#__PURE__*/(
      React.createElement("section", {
        className: "ui-photo-detail",
        onClick: () => this.transition({ type: 'EXIT_PHOTO' }) }, /*#__PURE__*/
      React.createElement("img", {
        src: this.state.photo.media.m,
        className: "ui-photo",
        "data-flip-key": this.state.photo.link })));



  }
  render() {
    const galleryState = this.state.gallery;

    return /*#__PURE__*/(
      React.createElement("div", {
        className: "ui-app",
        "data-state": galleryState,
        ref: node => this.node = node },

      this.renderForm(galleryState),
      this.renderGallery(galleryState),
      this.renderPhoto(galleryState)));


  }}


if (!Element.prototype.animate) {
  ReactDOM.render( /*#__PURE__*/React.createElement("h3", null, "Sorry, but your browser does not support the Web Animations API yet."), document.querySelector('#app'));
} else {
  ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector('#app'));
}