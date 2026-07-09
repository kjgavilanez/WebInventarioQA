import 'dart:convert';

import '../../../../core/api/api_client.dart';
import '../../../../core/storage/secure_storage.dart';
import '../models/usuario.dart';

class AuthRepository {
  AuthRepository({ApiClient? api, SecureStorage? storage})
      : _api = api ?? ApiClient.instance,
        _storage = storage ?? SecureStorage();

  final ApiClient _api;
  final SecureStorage _storage;

  Future<AuthResult> login({
    required String email,
    required String password,
  }) async {
    final res = await _api.guard<Map<String, dynamic>>(
      () => _api.post('/auth/login', data: {
        'email': email,
        'password': password,
      }),
    );
    final token = res['token'] as String;
    final usuario = Usuario.fromJson(res['usuario'] as Map<String, dynamic>);

    await _storage.saveToken(token);
    await _storage.saveUsuarioJson(jsonEncode(usuario.toJson()));

    return AuthResult(token: token, usuario: usuario);
  }

  Future<Usuario> register({
    required String nombre,
    required String email,
    required String password,
  }) async {
    final res = await _api.guard<Map<String, dynamic>>(
      () => _api.post('/auth/register', data: {
        'nombre': nombre,
        'email': email,
        'password': password,
      }),
    );
    return Usuario.fromJson(res);
  }

  Future<Usuario?> loadSavedSession() async {
    final token = await _storage.getToken();
    final usuarioJson = await _storage.getUsuarioJson();
    if (token == null || usuarioJson == null) return null;
    try {
      final map = jsonDecode(usuarioJson) as Map<String, dynamic>;
      return Usuario.fromJson(map);
    } catch (_) {
      await _storage.clearAll();
      return null;
    }
  }

  Future<void> logout() async {
    await _storage.clearAll();
  }
}
