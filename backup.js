//code for sharing links on fb via shareDialog

/*axios.get(this.props.shareImage.url)
.then((resp) => console.log(resp.data));
console.log(this.props.shareImage);
if (this.props.shareImage === null) {
  Alert.alert('select an image first.');
  return;
}*/
//download selected image
/*
RNFetchBlob
  .config({
    path: dirs.CacheDir + '/crazyAF.jpg'
  })
  .fetch('GET', `${this.props.shareImage.url}`)
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path());
    if (Platform.OS === 'ios') {
        path = `file://${res.path()}`;
    } else {
        path = `${res.path()}`;
    }
    console.log(path);
  });

  const sharePhoto1 = {
    imageUrl: path,
    userGenerated: true,
    caption: 'hi'
  };

  const sharePhotoContent1 = {
    contentType: 'photo',
    photos: [sharePhoto1]
  };
  console.log(sharePhoto1.imageUrl);
  this.setState({ shareLinkContent: sharePhotoContent1 }, () => {
    const tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then((canShow) => {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then((result) => {
        if (result.isCancelled) {
          Alert.alert('Share cancelled');
        } else {
          Alert.alert('Share success with postId: '
            + result.postId);
        }
      },
      (error) => {
        console.log('Share fail with error: ' + error);
      }
    );
  });
  */


  /*
  if (info.viewableItems[0].key.includes('Pantaloons')) {
    this.flatListRefHor.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
  } else if ()

      if (info.viewableItems[0].key.includes('Pantaloons')) {
        console.log('panta');
          let t = true;
        info.viewableItems.forEach((child) => {
          if (!child.key.includes('Pantaloons')) {
            t = false;
          }
        });
        if (t) {
          this.flatListRefHor.scrollToIndex({ animated: false, index: 0, viewPosition: 0 });
        }
      } else if (info.viewableItems[0].key.includes('Woodland')) {
          let t = true;
        info.viewableItems.forEach((child) => {
          if (!child.key.includes('Woodland')) {
            t = false;
          }
        });
        if (t) {
          this.flatListRefHor.scrollToIndex({ animated: false, index: 1, viewPosition: 0 });
        }
      } */
