import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface FilterIconProps {
  isActive: boolean;
}

export const FilterIcon = ({isActive}: FilterIconProps) => {
  if (isActive) {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path
          d="M23.723 20.2347C23.723 20.3879 23.6929 20.5396 23.6343 20.6812C23.5756 20.8228 23.4897 20.9514 23.3814 21.0597C23.273 21.1681 23.1444 21.254 23.0028 21.3126C22.8613 21.3712 22.7095 21.4014 22.5563 21.4013H11.8413C11.6036 22.0831 11.1597 22.6739 10.571 23.092C9.98244 23.5102 9.27834 23.7348 8.55635 23.7348C7.83436 23.7348 7.13026 23.5102 6.54165 23.092C5.95305 22.6739 5.5091 22.0831 5.27137 21.4013H1.55632C1.2469 21.4013 0.95015 21.2784 0.731357 21.0596C0.512565 20.8408 0.389648 20.5441 0.389648 20.2347C0.389648 19.9253 0.512565 19.6285 0.731357 19.4097C0.95015 19.1909 1.2469 19.068 1.55632 19.068H5.2713C5.50906 18.3863 5.95302 17.7955 6.54163 17.3774C7.13024 16.9593 7.83433 16.7347 8.55631 16.7347C9.2783 16.7347 9.98239 16.9593 10.571 17.3774C11.1596 17.7955 11.6036 18.3863 11.8413 19.068H22.5563C22.7095 19.068 22.8613 19.0981 23.0028 19.1567C23.1444 19.2154 23.273 19.3013 23.3814 19.4096C23.4897 19.518 23.5756 19.6466 23.6343 19.7882C23.6929 19.9297 23.723 20.0815 23.723 20.2347ZM22.5563 10.9013H20.008C19.7702 10.2196 19.3263 9.62879 18.7377 9.2107C18.1491 8.79261 17.445 8.568 16.723 8.568C16.001 8.568 15.2969 8.79261 14.7083 9.2107C14.1197 9.62879 13.6757 10.2196 13.438 10.9013H1.55632C1.2469 10.9013 0.95015 11.0243 0.731357 11.2431C0.512565 11.4618 0.389648 11.7586 0.389648 12.068C0.389648 12.3774 0.512565 12.6742 0.731357 12.893C0.95015 13.1118 1.2469 13.2347 1.55632 13.2347H13.438C13.6758 13.9164 14.1197 14.5073 14.7083 14.9254C15.2969 15.3435 16.001 15.5681 16.723 15.5681C17.445 15.5681 18.1491 15.3435 18.7377 14.9254C19.3263 14.5073 19.7703 13.9164 20.008 13.2347H22.5563C22.8657 13.2347 23.1625 13.1118 23.3813 12.893C23.6001 12.6742 23.723 12.3774 23.723 12.068C23.723 11.7586 23.6001 11.4618 23.3813 11.2431C23.1625 11.0243 22.8657 10.9013 22.5563 10.9013ZM1.55632 5.06801H7.6047C7.84244 5.74974 8.28638 6.34061 8.87499 6.75872C9.46359 7.17682 10.1677 7.40144 10.8897 7.40144C11.6117 7.40144 12.3158 7.17682 12.9044 6.75872C13.493 6.34061 13.9369 5.74974 14.1747 5.06801H22.5563C22.8657 5.06801 23.1625 4.9451 23.3813 4.7263C23.6001 4.50751 23.723 4.21077 23.723 3.90135C23.723 3.59193 23.6001 3.29518 23.3813 3.07639C23.1625 2.8576 22.8657 2.73468 22.5563 2.73468H14.1747C13.9369 2.05297 13.4929 1.46212 12.9043 1.04404C12.3157 0.625949 11.6116 0.401337 10.8896 0.401337C10.1677 0.401337 9.46357 0.625949 8.87496 1.04404C8.28636 1.46212 7.8424 2.05297 7.60463 2.73468H1.55632C1.2469 2.73468 0.95015 2.8576 0.731357 3.07639C0.512565 3.29518 0.389648 3.59193 0.389648 3.90135C0.389648 4.21077 0.512565 4.50751 0.731357 4.7263C0.95015 4.9451 1.2469 5.06801 1.55632 5.06801Z"
          fill="black"
        />
        <Path
          d="M21.7366 12.0681C21.7366 14.7788 19.5391 16.9763 16.8284 16.9763C14.1177 16.9763 11.9202 14.7788 11.9202 12.0681C11.9202 9.35731 14.1177 7.15982 16.8284 7.15982C19.5391 7.15982 21.7366 9.35731 21.7366 12.0681Z"
          fill="#A5EE68"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.8284 14.9763C18.4346 14.9763 19.7366 13.6742 19.7366 12.0681C19.7366 10.4619 18.4346 9.15982 16.8284 9.15982C15.2222 9.15982 13.9202 10.4619 13.9202 12.0681C13.9202 13.6742 15.2222 14.9763 16.8284 14.9763ZM16.8284 16.9763C19.5391 16.9763 21.7366 14.7788 21.7366 12.0681C21.7366 9.35731 19.5391 7.15982 16.8284 7.15982C14.1177 7.15982 11.9202 9.35731 11.9202 12.0681C11.9202 14.7788 14.1177 16.9763 16.8284 16.9763Z"
          fill="black"
        />
      </Svg>
    );
  }
  return (
    <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
      <Path
        d="M23.5577 20.5246C23.5577 20.6778 23.5276 20.8296 23.469 20.9711C23.4104 21.1127 23.3244 21.2413 23.2161 21.3497C23.1077 21.458 22.9791 21.5439 22.8375 21.6026C22.696 21.6612 22.5443 21.6913 22.391 21.6913H11.6761C11.4383 22.373 10.9944 22.9639 10.4058 23.382C9.81716 23.8001 9.11306 24.0247 8.39107 24.0247C7.66908 24.0247 6.96497 23.8001 6.37637 23.382C5.78777 22.9639 5.34382 22.373 5.10608 21.6913H1.39103C1.08161 21.6913 0.784866 21.5684 0.566074 21.3496C0.347281 21.1308 0.224365 20.834 0.224365 20.5246C0.224365 20.2152 0.347281 19.9185 0.566074 19.6997C0.784866 19.4809 1.08161 19.358 1.39103 19.358H5.10601C5.34378 18.6763 5.78774 18.0854 6.37635 17.6673C6.96495 17.2492 7.66905 17.0246 8.39103 17.0246C9.11301 17.0246 9.81711 17.2492 10.4057 17.6673C10.9943 18.0854 11.4383 18.6763 11.6761 19.358H22.391C22.5443 19.3579 22.696 19.3881 22.8375 19.4467C22.9791 19.5053 23.1077 19.5912 23.2161 19.6996C23.3244 19.8079 23.4104 19.9366 23.469 20.0781C23.5276 20.2197 23.5577 20.3714 23.5577 20.5246ZM22.391 11.1913H19.8427C19.605 10.5096 19.161 9.91874 18.5724 9.50065C17.9838 9.08256 17.2797 8.85795 16.5577 8.85795C15.8357 8.85795 15.1316 9.08256 14.543 9.50065C13.9544 9.91874 13.5104 10.5096 13.2727 11.1913H1.39103C1.08161 11.1913 0.784866 11.3142 0.566074 11.533C0.347281 11.7518 0.224365 12.0485 0.224365 12.358C0.224365 12.6674 0.347281 12.9641 0.566074 13.1829C0.784866 13.4017 1.08161 13.5246 1.39103 13.5246H13.2727C13.5105 14.2064 13.9544 14.7972 14.543 15.2153C15.1316 15.6334 15.8357 15.8581 16.5577 15.8581C17.2797 15.8581 17.9838 15.6334 18.5724 15.2153C19.161 14.7972 19.605 14.2064 19.8427 13.5246H22.391C22.7005 13.5246 22.9972 13.4017 23.216 13.1829C23.4348 12.9641 23.5577 12.6674 23.5577 12.358C23.5577 12.0485 23.4348 11.7518 23.216 11.533C22.9972 11.3142 22.7005 11.1913 22.391 11.1913ZM1.39103 5.35796H7.43942C7.67715 6.03968 8.1211 6.63056 8.7097 7.04866C9.29831 7.46677 10.0024 7.69139 10.7244 7.69139C11.4464 7.69139 12.1505 7.46677 12.7391 7.04866C13.3277 6.63056 13.7716 6.03968 14.0094 5.35796H22.391C22.7005 5.35796 22.9972 5.23504 23.216 5.01625C23.4348 4.79746 23.5577 4.50071 23.5577 4.19129C23.5577 3.88187 23.4348 3.58513 23.216 3.36634C22.9972 3.14754 22.7005 3.02463 22.391 3.02463H14.0094C13.7716 2.34292 13.3277 1.75207 12.7391 1.33398C12.1504 0.915896 11.4463 0.691284 10.7244 0.691284C10.0024 0.691284 9.29829 0.915896 8.70968 1.33398C8.12107 1.75207 7.67711 2.34292 7.43935 3.02463H1.39103C1.08161 3.02463 0.784866 3.14754 0.566074 3.36634C0.347281 3.58513 0.224365 3.88187 0.224365 4.19129C0.224365 4.50071 0.347281 4.79746 0.566074 5.01625C0.784866 5.23504 1.08161 5.35796 1.39103 5.35796Z"
        fill="black"
      />
    </Svg>
  );
};
