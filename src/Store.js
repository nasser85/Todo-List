export default class Store {
    static init() {
        if (!window.localStorage.hasOwnProperty('todos')) {
            window.localStorage.todos = '[]';
        }
    }
    static _encode(data) {
        return JSON.stringify(data);
    }
    static _decode(data) {
        return JSON.parse(data);
    }
    static add(obj) {
        var todos = Store._decode(window.localStorage.todos);
        todos.push(obj)
        window.localStorage.todos = Store._encode(todos);
    }
    static remove(id) {
        var newTodos = Store._decode(window.localStorage.todos).filter(el=>el.id != id);
        window.localStorage.todos = Store._encode(newTodos);
    }
    static toggleComplete(id) {
        var todos = Store._decode(window.localStorage.todos);
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == id) {
                todos[i].complete = !todos[i].complete;
                break;
            }
        }
        window.localStorage.todos = Store._encode(todos);
    }
    static removeAll() {
        window.localStorage.todos = '[]';
    }
    static removeComplete() {
        var newTodos = Store._decode(window.localStorage.todos).filter(el=>!el.complete);
        window.localStorage.todos = Store._encode(newTodos);
    }
    static getTodos() {
        return Store._decode(window.localStorage.todos);
    }
}
