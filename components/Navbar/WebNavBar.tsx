import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { FaAlignJustify, FaCartPlus, FaHeart } from 'react-icons/fa6';
import logo from '../../public/assets/images/logo.png';
import stylesNavbar from '../../styles/components/navbar.module.scss';
import MobileProductCategories from './MobileProductCategories';
import ProductCatagoriesNavbar from './ProductCatagoriesNavbar';

function WebNavBar({
  navbarData,
  isLoading,
  errorMessage,
  selectedCurrencyValue,
  handleLogoutUser,
  multiLanguagesData,
  selectedLang,
  handleLanguageChange,
  selectedLanguageData,
  cartCount,
  wishlistCount,
  isLoggedIn,
}: any) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const user = localStorage.getItem('party_name');
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm !== '') {
      router.push('/product/' + searchTerm);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const handleShowDropDown = () => setShowDropDown(!showDropDown);
  const handleToggle = (e: any) => {
    setShowDropDown((prevState) => !prevState);
  };

  return (
    <>
      <header className={stylesNavbar.header}>
        <nav>
          <div className={`${stylesNavbar.navbar} ps-lg-4 pe-lg-4`}>
            <div className="w-100 d-flex justify-content-end pt-4">
              <div className="mobile-nav d-flex justify-content-sm-between px-3 px-sm-4 d-sm-block d-md-none">
                <Link href="#" legacyBehavior>
                  <a
                    className="mobile-menu-toggle  w-icon-hamburger"
                    aria-label="menu-toggle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <FaAlignJustify className="icon" />
                  </a>
                </Link>
              </div>
              <div className={`${stylesNavbar.logo} d-none d-sm-none d-md-block`}>
                <Link href="/" legacyBehavior>
                  <a>
                    <Image className="pb-2 mb-1" src={logo} alt="logo" width={250} priority={true} />
                  </a>
                </Link>
              </div>
              <div className={`d-block ${stylesNavbar.search_bar}`}>
                <div className="search-input position-relative">
                  <input
                    type="text"
                    className={`form-control ${stylesNavbar.search_bar_input}`}
                    placeholder="Search here"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                  />
                  <FaSearch className={stylesNavbar.search_icon} />
                </div>
              </div>
              <div className={stylesNavbar.inlineList}>
                <ul className="nav list-inline d-flex justify-content-end px-3">
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/cart" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaCartPlus className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{cartCount}</span>
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>
                            {selectedLanguageData?.cart}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={stylesNavbar.list_inline_item}>
                    <Link href="/wishlist " legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FaHeart className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} text-white`}>{wishlistCount}</span>
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>
                            {selectedLanguageData?.wishlist}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={stylesNavbar.list_inline_item}>
                    {isLoggedIn ? (
                      <>
                        <div className={stylesNavbar.icon_container} onClick={handleShowDropDown}>
                          <FaUserCircle className="icon" />
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>{user}</span>
                        </div>

                        {isLoggedIn && (
                          <NavDropdown
                            title={''}
                            id="basic-nav-dropdown"
                            className={` ${stylesNavbar.order_list_dropdown}`}
                            show={showDropDown}
                            onToggle={handleToggle}
                          >
                            <NavDropdown.Item
                              as="a"
                              className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                            ></NavDropdown.Item>

                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.quick_order}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.my_account}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.dealer_ledger}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/catalog" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.view_catalogs}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/my-orders" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.my_order}
                              </NavDropdown.Item>
                            </Link>

                            <Link href="#" passHref className="text-decoration-none" onClick={handleLogoutUser}>
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.logout}
                              </NavDropdown.Item>
                            </Link>
                          </NavDropdown>
                        )}
                      </>
                    ) : (
                      <Link href={'/login'} className={stylesNavbar.icon_container} onClick={handleShowDropDown}>
                        <FaUserCircle className="icon" />
                        <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>
                          {selectedLanguageData.sign_in}
                        </span>
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <MobileProductCategories
        show={isSidebarOpen}
        handleClose={handleCloseSidebar}
        navbarData={navbarData}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedLanguageData={selectedLanguageData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
      <ProductCatagoriesNavbar
        navbarData={navbarData}
        errorMessage={errorMessage}
        selectedCurrencyValue={selectedCurrencyValue}
        multiLanguagesData={multiLanguagesData}
        selectedLang={selectedLang}
        handleLanguageChange={handleLanguageChange}
      />
    </>
  );
}

export default WebNavBar;
