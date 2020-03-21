export default function ({ store, redirect }) {
  console.log('login middleware')
  // If the user is not authenticated
  if (!store.state.isLogin) {
    console.log("NOT LOGIN")
    // return redirect('/login')
  }
}