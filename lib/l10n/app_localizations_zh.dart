// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Chinese (`zh`).
class AppLocalizationsZh extends AppLocalizations {
  AppLocalizationsZh([String locale = 'zh']) : super(locale);

  @override
  String get appTitle => 'SG枫叶留学销售台';

  @override
  String get loginTitle => 'SG枫叶留学销售台';

  @override
  String get loginSubtitle => '这是内部销售系统，请先登录（推荐使用Google账号）';

  @override
  String get signInGoogle => 'Google 登录';

  @override
  String get signInGuest => '访客模式';

  @override
  String get signInGuestNote => '访客模式：仅限本次会话。建议使用Google登录以保留操作记录。';

  @override
  String get signingIn => '登录中...';

  @override
  String signInFailed(Object error) {
    return '登录失败: $error';
  }

  @override
  String guestSignInFailed(Object error) {
    return '访客登录失败: $error';
  }

  @override
  String get signOut => '退出登录';

  @override
  String get clientIntake => '客户信息录入';

  @override
  String get clientName => '客户姓名';

  @override
  String get nameRequired => '请输入姓名';

  @override
  String get email => '邮箱';

  @override
  String get enterValidEmail => '请输入有效的邮箱';

  @override
  String get phone => '电话';

  @override
  String get destination => '意向国家';

  @override
  String get goal => '留学目标';

  @override
  String get budgetRange => '预算范围';

  @override
  String get intendedStart => '预计入学时间';

  @override
  String get selectDate => '选择日期';

  @override
  String get notesRequirements => '备注 / 需求';

  @override
  String get matchServices => '匹配服务';

  @override
  String get saveClient => '保存客户';

  @override
  String get saving => '保存中...';

  @override
  String get serviceMatch => '服务匹配';

  @override
  String get runMatchToSee => '运行服务匹配以查看推荐套餐。';

  @override
  String get selectionSummary => '已选服务';

  @override
  String clientId(Object id) {
    return '客户 ID: $id';
  }

  @override
  String get noServicesSelected => '暂未选择服务。';

  @override
  String get estimatedTotal => '预计总额';

  @override
  String get generateDocsNote => '保存客户后可生成文档。';

  @override
  String get documents => '文档生成';

  @override
  String get quotation => '报价单';

  @override
  String get invoice => '发票';

  @override
  String get contract => '合同';

  @override
  String get total => '总计';

  @override
  String get downloadPdf => '下载 PDF';

  @override
  String get generate => '生成';

  @override
  String get generating => '生成中...';

  @override
  String docGenerated(Object type) {
    return '$type 已生成';
  }

  @override
  String get selectOneService => '请至少选择一项服务';

  @override
  String get clientSaved => '客户已保存';

  @override
  String saveFailed(Object error) {
    return '保存失败: $error';
  }

  @override
  String get reminders => '提醒事项';

  @override
  String get selectDateAndTime => '请选择提醒日期和时间';

  @override
  String get title => '标题';

  @override
  String get clientFollowUp => '跟进客户';

  @override
  String get date => '日期';

  @override
  String get time => '时间';

  @override
  String get selectTime => '选择时间';

  @override
  String get durationMinutes => '时长 (分钟)';

  @override
  String get detailedNotes => '详细备注';

  @override
  String get saveToFirestore => '保存到系统';

  @override
  String get addToCalendar => '添加到 Google 日历';

  @override
  String get reminderSaved => '提醒已保存';

  @override
  String get settings => '设置';

  @override
  String get language => '语言';

  @override
  String get theme => '主题';

  @override
  String get cancel => '取消';

  @override
  String get ok => '确定';

  @override
  String get destSingapore => '新加坡';

  @override
  String get destAustralia => '澳大利亚';

  @override
  String get destUK => '英国';

  @override
  String get destUS => '美国';

  @override
  String get destCanada => '加拿大';

  @override
  String get destOther => '其他';

  @override
  String get publicSchoolAEIS => '公立学校 (AEIS)';

  @override
  String get publicUniversity => '公立大学';

  @override
  String get privateUniversity => '私立大学';

  @override
  String get internationalSchool => '国际学校';

  @override
  String get goalOther => '其他';

  @override
  String get newBusiness => '新业务';

  @override
  String get historyRecords => '历史记录';

  @override
  String get studyAbroad => '留学';

  @override
  String get immigration => '移民';

  @override
  String get housing => '找房';

  @override
  String get otherBusiness => '其他';

  @override
  String get noRecords => '暂无记录';

  @override
  String get loadMore => '加载更多';

  @override
  String get statusPending => '待处理';

  @override
  String get statusInProgress => '进行中';

  @override
  String get statusCompleted => '已完成';

  @override
  String get statusCancelled => '已取消';
}
