window.React = require("react")
window.Phlux = require("phlux")

var FrameView = require("<scripts>/views/FrameView")

var GameView = React.createClass({
    render: function() {
        return (
            <FrameView>
                Hello World!!
            </FrameView>
        )
    }
})

React.render(<GameView/>, document.body)
