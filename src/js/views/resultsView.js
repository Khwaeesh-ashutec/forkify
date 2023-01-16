import View from "./View";
import previewView from "./previewView";
import icons from 'url:../../img/icons.svg'

class ResultView extends View {
    _parentElement = document.querySelector('.results');
    _errorMessage = 'Not found any recipe for your search! Try again';
    _message = '';

    _generateMarkup() {
        return this._data.map(result => previewView.render(result, false)).join('')
    }
}

export default new ResultView();