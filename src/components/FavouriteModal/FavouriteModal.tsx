import React, { PureComponent } from 'react';
import classes from './styles.module.scss';
import { connect } from 'react-redux';
import { IBeerElem, IState } from '../../redux/types';
import { removeFromFavouriteList, removeFromFavouriteListType} from '../../redux/actions';


type propsType = {
  hideModal: () => void,
  favIdList: IBeerElem[],
  removeFromFavouriteList: (arg0: number) => void
}

class FavouriteModal extends PureComponent<propsType> {

  closeModal() {
    this.props.hideModal();
  }

  removeFromFavs = (id: number) => {
    this.props.removeFromFavouriteList(id);
  }

  render() {

    let content: JSX.Element[] | JSX.Element = this.props.favIdList.map((elem: IBeerElem) => {
      return (
        <div key={elem.id} className={classes['fav-card']}>
          <div className={classes['fav-img-wrapper']}><img className={classes['fav-img']} src={elem.image_url}
                                                           alt={elem.image_url}/></div>
          <div className={classes['fav-descr']}>
            <span>{elem.name}</span>
            <p>{elem.tagline}</p>
            <span>{elem.abv}</span>
            <button onClick={() => this.removeFromFavs(elem.id)} className={classes.remove}>Remove</button>
          </div>
        </div>
      )
    })

    if (this.props.favIdList.length === 0) {
      content = <p className={classes.noFavs}>No favourite products</p>;
    }

    return (
      <div className={classes['fav-container']}>
        <div onClick={this.closeModal.bind(this)} className={classes.close}>X</div>
        <div className={classes['fav-modal']}>

          {content}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState) => ({
  favIdList: state.favouritesProductReducer.favouritesArr
})

const mapDispatchToProps = (dispatch: (arg0: removeFromFavouriteListType) => void) => {
  return {
    removeFromFavouriteList: (id: number) => dispatch(removeFromFavouriteList(id)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FavouriteModal);