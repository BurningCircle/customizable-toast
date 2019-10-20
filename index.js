module.exports = (function () {
    var container = null;
    let toasts = new Array();
    let count = 0;
    let delay = 3000;
    const type = {
        SUCCESS: 'success',
        ERROR: 'error',
        WARNING: 'warning',
        NOTIFICATION: 'notification'
    };

    const _createContainer = () => {
        if (!container) {
            container = document.createElement('div');
            document.body.appendChild(container);
            container = _addStylesToContainer(container);
        }
    };
    const _addStylesToContainer = container => {
        container.classList.add('toast-container');
        let style = container.currentStyle || window.getComputedStyle(container);
        if (style.position === 'static') {
            const styles = {
                position: 'fixed',
                display: 'inline-block',
                top: '40px',
                right: '40px'
            }
            for (let key of Object.keys(styles)) {
                container.style[key] = styles[key];
            }
        }

        return container;
    };
    const _createNotification = (message, type) => {
        let notif = document.createElement('div');
        let id = Date.now();
        notif.id = id;
        notif.innerHTML = message;
        notif.classList.add('toast')
        notif.classList.add(`toast-${type}`);
        notif.style.overflow = 'hidden';
        container.appendChild(notif);
        toasts.push({
            id,
            notif
        });
        setTimeout(() => {
            let element = toasts.find(element => element.id === id);
            const { notif } = element;
            let style = notif.currentStyle || window.getComputedStyle(notif);
            const transition = parseFloat(style.transition.split(' ')[1].replace('s', ''));
            if (transition) {
                notif.addEventListener('transitionend', () => {
                    notif.style.padding = 0;
                    notif.style.height = 0;
                    notif.style.marginBottom = 0;
                    let delay;
                    try {
                        delay = 1000 * transition;
                    } catch (err) {
                        delay = 1000;
                    }
                    setTimeout(() => {
                        _removeNotification(element);
                    }, delay)
                })
            } else {
                _removeNotification(element);
            }
            notif.classList.add('toast-remove');
            notif.style.opacity = 0;
        }, delay)
    };
    const _removeNotification = element => {
        try {
            container.removeChild(element.notif);
            toasts.splice(toasts.indexOf(element), 1);
            if (toasts.length === 0) {
                document.body.removeChild(container);
                container = null;
            }
        } catch (err) {

        }
    };
    const _getVarName = variable => Object.keys(variable)[0];

    return {
        success: function (message) {
            _createContainer();
            _createNotification(message, type.SUCCESS);
        },
        error: function (message) {
            _createContainer();
            _createNotification(message, type.ERROR);
        },
        warning: function (message) {
            _createContainer();
            _createNotification(message, type.WARNING);
        },
        notification: function (message) {
            _createContainer();
            _createNotification(message, type.NOTIFICATION);
        },
        setDelay: function (newDelay) {
            if (!isNaN(newDelay)) {
                delay = parseInt(newDelay);
            } else {
                console.table({
                    library: 'Customizable toast',
                    error: 'Wrong type of delay param',
                    [_getVarName({ delay })]: newDelay
                });
            }
        }
    }
}())
