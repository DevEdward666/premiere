import React from 'react';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
export default function SkeletonMsgLst() {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="column"
        alignItems="center"
        marginLeft={15}
        marginTop={15}>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-start">
          <SkeletonPlaceholder.Item
            width={width - 200}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-end">
          <SkeletonPlaceholder.Item
            width={width - 250}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-start">
          <SkeletonPlaceholder.Item
            width={width - 200}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-end">
          <SkeletonPlaceholder.Item
            width={width - 250}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-start">
          <SkeletonPlaceholder.Item
            width={width - 200}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-end">
          <SkeletonPlaceholder.Item
            width={width - 250}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-start">
          <SkeletonPlaceholder.Item
            width={width - 200}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-end">
          <SkeletonPlaceholder.Item
            width={width - 250}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={20} alignSelf="flex-start">
          <SkeletonPlaceholder.Item
            width={width - 200}
            height={50}
            borderRadius={20}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
