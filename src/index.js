var KSortable = (function () {
  var Sortable = function ({target = null} = {}) {
    if(target === null || !(target instanceof HTMLElement)) return;

    this.parent = target;
    this.elems = target.children;

    this.initHandlers();
  };

  Sortable.prototype = (function () {
    var _handlerMouseDown = function (e) {
      this.target = e.target;
      this.avatar = this.target.cloneNode(true);

      document.onmousemove = _handlerMouseMove.bind(this);
    };

    var _handlerMouseUp = function (e) {
      document.onmousemove = null;
      this.target.classList.remove("sortable-selected");
      this.avatar.remove();
      var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
          relatedTarget = relatedTarget.closest("li");

      if(relatedTarget !== null && relatedTarget.parentNode.getAttribute("id") === this.parent.getAttribute("id")) {
        var temp1 = relatedTarget.nextSibling;
        var temp2 = this.target.nextSibling;

        this.parent.insertBefore(this.target, temp1);
        this.parent.insertBefore(relatedTarget, temp2);
      }
    };

    var _handlerMouseMove = function (e) {
      this.target.parentNode.insertBefore(this.avatar, this.target);
      var shiftY = e.pageY - _getCoords(this.target.parentNode).top,
          top = shiftY - this.avatar.offsetHeight / 2,
          shiftX = e.pageX - _getCoords(this.target.parentNode).left,
          left = shiftX - this.avatar.offsetWidth / 2;

      this.avatar.style.top = top + "px";
      this.avatar.style.left = left + "px";
      this.target.classList.add("sortable-selected");
      this.avatar.classList.add("sortable-moved");
    };

    var _getCoords = function (element) {
      var element = element.getBoundingClientRect();

      return {
        top: element.top,
        left: element.left
      };
    };

    var initHandlers = function () {
      [].forEach.call(this.elems, (elem) => {
        elem.onmousedown = _handlerMouseDown.bind(this);
      });
      this.parent.onmouseup = _handlerMouseUp.bind(this);
      document.ondragstart = function () {
        return false;
      }
    };

    return {
      initHandlers,
    };
  })();

  return Sortable;
})();

var list1 = new Sortable({
  target: document.getElementById("list-1")
});
var list2 = new Sortable({
  target: document.getElementById("list-2")
});
var list3 = new Sortable({
  target: document.getElementById("list-3")
});
var list4 = new Sortable({
  target: document.getElementById("list-4")
});
