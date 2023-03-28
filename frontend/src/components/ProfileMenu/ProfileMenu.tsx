import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileMenu.module.scss';

export type ProfileMenuType = {
  title: string;
  url: string;
};

type ProfileMenuPropsType = {
  menuList: ProfileMenuType[];
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

function ProfileMenu({ menuList, setShowProfileMenu }: ProfileMenuPropsType) {
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const onClickMenuItem = (url: string) => {
    navigate(url);
  };

  return (
    <div ref={menuRef} className={styles.component}>
      {menuList.map((item) => (
        <div key={item.url} className={styles.item} onClick={() => onClickMenuItem(item.url)}>
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default ProfileMenu;
