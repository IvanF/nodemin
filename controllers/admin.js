const path = require('path');
const dir = require('node-dir');
const fs = require('fs');
const uploaded_path = '../public/pic/uploaded/';

const admin = {
  photo_index: function (req, res) {
    getSlider();

    function getSlider () {
      Slider.find().limit(20).exec(function (err, sliderList) {
        if (err) return console.log(err)
        var r_arr = []
        if (sliderList && sliderList.length) {
          for (var i = 0, len = sliderList.length; i < len; i++) {
            r_arr.push(sliderList[i].filename)
          }
        }
        Return(r_arr)
      })
    }

    function Return (sliderList) {
      var files = dir.files(path.join(__dirname, uploaded_path), { sync: true, type: 'file', shortName: true })
      res.render('photo/index', {
        sliderItems: sliderList,
        files: files,
        user: req.user,
        layout: 'dashboard'
      })
    }
  },
  photo_upload: function (req, res) {
    if (req.files == null) {
      res.status(400).send("There's no photo selected.")
      return
    }
    var file = req.files.file
    var dir = path.join(__dirname, uploaded_path)
    file.mv(dir + req.files.file.name, function (err) {
      if (err) { return res.status(500).send(err) }

      res.redirect('/photo')
    })
  },
  photo_remove: function (req, res) {
    var filename = req.params.filename
    var full_path = path.join(__dirname, uploaded_path + filename)
    fs.unlink(full_path, function (err) {
      if (err) throw err

      Slider.deleteOne({ filename: filename }, function (err) {
        if (err) return console.log(err)
      })

      res.redirect('/photo')
    })
  },
  slider_add: function (req, res) {
    var filename = req.params.filename
    var sl = new Slider({
      filename: filename
    })
    sl.save(function (err) {
      if (err) throw err
      res.send('added')
    })
  },
  slider_remove: function (req, res) {
    var filename = req.params.filename
    Slider.deleteOne({ filename: filename }, function (err) {
      if (err) return console.log(err)
      res.send('removed')
    })
  },
  carousel_index: function (req, res) {
    getCarousel()

    function getCarousel () {
      Carousel.find().limit(1).exec(function (err, carouselList) {
        if (err) return console.log(err)
        Return(carouselList)
      })
    }

    function Return (carouselList) {
      res.render('carousel/index', {
        user: req.user,
        carouselList: carouselList,
        layout: 'dashboard'
      })
    }
  },
  carousel_save: function (req, res) {
    Carousel.findOne().exec(function (err, carousel) {
      if (carousel) {
        carousel.sm01 = req.body.sm01
        carousel.sm02 = req.body.sm02
        carousel.sm03 = req.body.sm03
        carousel.sm04 = req.body.sm04

        carousel.save(function (err) {
          if (err) throw err
        })
      } else {
        var data = {
          sm01: req.body.sm01,
          sm02: req.body.sm02,
          sm03: req.body.sm03,
          sm04: req.body.sm04
        }
        var st = new Carousel(data)
        st.save(function (err) {
          if (err) throw err
        })
      }
      res.redirect('/carousel')
    })
  },
  compositions_index: function (req, res) {
    getComp()

    function getComp () {
      Compositions.find().limit(100).exec(function (err, compList) {
        if (err) return console.log(err)
        Return(compList)
      })
    }

    function Return (compList) {
      res.render('compositions/index', {
        user: req.user,
        compList: compList,
        layout: 'dashboard'
      })
    }
  },
  compositions_add: function (req, res) {
    var form_data = {
      h3: req.body.h3,
      comp_sub_1: req.body.comp_sub_1,
      comp_sub_2: req.body.comp_sub_2,
      comp_sub_3: req.body.comp_sub_3
    }
    var cm = new Compositions(form_data)
    cm.save(function (err) {
      if (err) throw err
      res.redirect('/compositions')
    })
  },
  compositions_edit: function (req, res) {
    var _id = req.params.id
    Compositions.findById(_id).exec(Return)

    function Return (err, composition) {
      res.render('compositions/item', {
        user: req.user,
        composition: composition,
        layout: 'dashboard'
      })
    }
  },
  compositions_save: function (req, res) {
    var _id = req.params.id
    Compositions.findById(_id).exec(function (err, composition) {
      if (composition) {
        composition.h3 = req.body.h3
        composition.comp_sub_1 = req.body.comp_sub_1
        composition.comp_sub_2 = req.body.comp_sub_2
        composition.comp_sub_3 = req.body.comp_sub_3

        composition.save(function (err) {
          if (err) throw err
          res.redirect('/compositions')
        })
      } else {
        res.status(400).send('Composition does not exist')
      }
    })
  },
  static_index: function (req, res) {
    getStatic()

    function getStatic () {
      Static.find().limit(1).exec(function (err, staticList) {
        if (err) return console.log(err)
        Return(staticList)
      })
    }

    function Return (staticList) {
      res.render('static/index', {
        user: req.user,
        staticList: staticList,
        layout: 'dashboard'
      })
    }
  },
  static_save: function (req, res) {
    Static.findOne().exec(function (err, statics) {
      if (statics) {
        statics.whats = req.body.whats
        statics.segments = req.body.segments

        statics.save(function (err) {
          if (err) throw err
          res.redirect('/static')
        })
      } else {
        var data = {
          whats: req.body.whats,
          segments: req.body.segments
        }
        var st = new Static(data)
        st.save(function (err) {
          if (err) throw err
          res.redirect('/static')
        })
      }
    })
  }
};

module.exports = admin;
