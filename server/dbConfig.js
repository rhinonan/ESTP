var mongoose = require('mongoose');
var dbUrl = "mongodb://localhost/ESTP";
mongoose.connect(dbUrl);
var UsersSchema = new mongoose.Schema({
  user: String, // 昵称
  username: String,// 账户名
  password: String,//密码
  tel: String,
  email: String,
  worktype: String,
  data: { type: Date, default: Date.now },
  avatar: String
});
var DynamicSchema = new mongoose.Schema({
  userId: String, //发布动态的用户
  title: String, //动态的标题
  content: String, //动态的内容
  praise: Number, // 点赞个数
  comment: Number, // 评论个数
  date: {type: Date, default: Date.now }
});
var ActivitySchema = new mongoose.Schema({
  userId: String,
  title: String,
  detail: String, //活动详情
  address: String, //活动举办地址
  unit: String, // 活动举办单位
  master: String, // 活动负责人姓名
  tel: String, //活动联系电话
  charge: Number, // 活动收费，可以为空
  img: String, // 活动的图片地址
  peopleNum: {
    type: Number,
    dafalt: 0
  },
  date: {type: Date, default: Date.now },
  holdDate: {type: Date, default: Date.now }
});

var TopicSchema = new mongoose.Schema({
  userId: String,
  sponsor: String, // 发起人
  title: String,
  detail: String,
  tag: [String],
  read: Number,
  praise: Number,
  comment: Number,
  date: {
    type : Date,
    default: Date.now
  }
});

var SiteSchema = new mongoose.Schema({
  title: String, //场地名称
  master: String, // 场地负责人
  detial: String, //场地详情
  price: Number, // 场地价格
  address: String, // 场地地址
  tel: String, // 场地联系电话
  merit: String, //场地优点
  imgs:[String], // 场地图片
  date: {
    type: Date,
    default: Date.now
  }
});

var CommentSchema = new mongoose.Schema({
  content: String,
  userId: String,
  sponsor: String,
  itemId: String, // 对应 话题 动态等的id
  date:{
    type: Date,
    default: Date.now
  }
});

var WorkTypeSchema = new mongoose.Schema({
  type: String,
  date: {
    type: Date,
    ddefault: Date.now
  }
});

/**
 * 项目需求
 */
var ProjectSchema = new mongoose.Schema({
  name: String,
  intro: String,
  area: String,
  industry: String,
  link: String,//项目链接
  detail: String,// 项目详情
  requireType: String,
  requireDetail: String,
  userId: String,
  tel:String,
  img:String,
  date: {
    type : Date,
    default: Date.now
  }
});

mongoose.model('Users', UsersSchema);
mongoose.model('Dynamic', DynamicSchema);
mongoose.model('Activity', ActivitySchema);
mongoose.model('Topic', TopicSchema);
mongoose.model('Site', SiteSchema);
mongoose.model('Comment', CommentSchema);
mongoose.model('WorkType', WorkTypeSchema);
mongoose.model('Project', ProjectSchema);