import React from 'react'

 function Footer() {
    return (
        <div>
            <footer class="info">
                <p>Click to edit a todo</p>
                <p>Created by Ezgi</p>
                <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
            </footer>
        </div>
    )
}
export default React.memo(Footer);