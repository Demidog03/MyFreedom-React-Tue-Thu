import classes from './Main.module.scss'

function Main() {
    return (
        <main className={classes.main}>
            <div className={classes.container}>
                <h1 className={classes.title}>Main</h1>
                <p className={classes.desc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet consequatur suscipit accusantium tempora repellat reiciendis harum, consequuntur nulla ea eveniet. Vero voluptatem architecto porro, explicabo a id aut commodi magni.</p>
            </div>
        </main>
    )
}

export default Main
