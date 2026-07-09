import 'package:flutter/foundation.dart';

import '../../../core/storage/secure_storage.dart';
import '../data/models/usuario.dart';
import '../data/repositories/auth_repository.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthProvider extends ChangeNotifier {
  AuthProvider({AuthRepository? repository, SecureStorage? storage})
      : _repository = repository ?? AuthRepository(),
        _storage = storage ?? SecureStorage();

  final AuthRepository _repository;
  final SecureStorage _storage;

  AuthStatus _status = AuthStatus.unknown;
  Usuario? _usuario;
  String? _token;

  AuthStatus get status => _status;
  Usuario? get usuario => _usuario;
  String? get token => _token;
  bool get isAuthenticated => _status == AuthStatus.authenticated;
  bool get isAdmin => _usuario?.isAdmin ?? false;

  Future<void> bootstrap() async {
    final saved = await _repository.loadSavedSession();
    final savedToken = await _storage.getToken();
    if (saved == null || savedToken == null) {
      _status = AuthStatus.unauthenticated;
    } else {
      _usuario = saved;
      _token = savedToken;
      _status = AuthStatus.authenticated;
    }
    notifyListeners();
  }

  Future<void> login({required String email, required String password}) async {
    final result = await _repository.login(email: email, password: password);
    _token = result.token;
    _usuario = result.usuario;
    _status = AuthStatus.authenticated;
    notifyListeners();
  }

  Future<Usuario> register({
    required String nombre,
    required String email,
    required String password,
  }) async {
    return _repository.register(
      nombre: nombre,
      email: email,
      password: password,
    );
  }

  Future<void> logout() async {
    await _repository.logout();
    _token = null;
    _usuario = null;
    _status = AuthStatus.unauthenticated;
    notifyListeners();
  }
}
