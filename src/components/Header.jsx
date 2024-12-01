function Header() {
  function logout() {
    alert("logout!");
  }
  return (
    <>
      <div className="h-[4rem] text-white bg-primary px-[2rem] pt-[1rem] text-2xl flex justify-between items-center">
        <p>SpendWise</p>
        <div onClick={logout}>Logout</div>
      </div>
    </>
  );
}
export default Header;
